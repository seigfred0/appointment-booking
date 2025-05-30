import { group } from 'console';
import { v4 as uuidv4 } from 'uuid';


// give the list of data and then the properties that needs to be extracted i.e. ["doctor_id", "day_of_week"]

export const extractProperties = (
    listOfData: any, 
    [ doctorKey, dayKey, clinicKey, startKey, endKey ]: any
) => {
    // console.log(listOfData[0], '+++')

    /*
    {
      doctorId: ""
      clinicId: ""
      start_time: 
      end_time:
      day_of_week: [1,2,3,4,5]
    }
    
    1. Organize by doctor
    
    doctorId: {
      clinic_id:
      day_of_week: []
      start_time:
      end_time
    }
    */
    const groups: Record<string, any[]> = {};

    for (const item of listOfData) {
        // console.log('item',item);
        const doctorId = item[doctorKey];

        if (!groups[doctorId]) {
            groups[doctorId] = []
        }
        // console.log('helo',groups[doctorId])

        // A boolean (true or false)—it tells you if something matches, but not what.
        // const alreadyExists = groups[doctorId].some(entry =>
        //     entry.day_of_week === item[dayKey] &&
        //     entry.clinic_id === item[clinicKey] &&
        //     entry.start_time === item[startKey] &&
        //     entry.end_time === item[endKey]
        // );

        // This will return the actual object from the array if it exists.
        const existingEntry = groups[doctorId].find(entry => {
          return entry[clinicKey] === item[clinicKey] 
          && entry[startKey] === item[startKey] 
          && entry[endKey] === item[endKey] 
        }); // it returns the first match

        // console.log(item, 'item')
        // console.log(existingEntry, 'exist')

        if (!existingEntry) {
          groups[doctorId].push({
              clinic_id: item[clinicKey],
              day_of_week: [item[dayKey]],
              start_time: item[startKey],
              end_time: item[endKey]
          }); 
        } else {
          if (!existingEntry.day_of_week.includes(item[dayKey])) {
            existingEntry.day_of_week.push(item[dayKey]);
          }
        }


        // console.log(groups, 'gourps')
        
        /*
        {
          '4d58e6c0-661c-4d7f-b6ad-9b018625e3c9': [
            {
              clinic_id: '33a4a840-2951-44fe-a2a1-ee0cf741f138',
              day_of_week: [Array],
              start_time: '09:00:00+08',
              end_time: '17:00:00+08'
            }
          ],
          '7af5ed12-c484-49a6-bda6-a7428edbc7ca': [
            {
              clinic_id: '33a4a840-2951-44fe-a2a1-ee0cf741f138',
              day_of_week: [Array],
              start_time: '09:00:00+08',
              end_time: '17:00:00+08'
            }
          ]
        } 

        Groups items by doctorId.
        Aggregates entries with the same clinic_id, start_time, and end_time.
        Adds day_of_week as an array and pushes new days if not already included.

        '7af5ed12-c484-49a6-bda6-a7428edbc7ca': [
        {
          clinic_id: '33a4a840-2951-44fe-a2a1-ee0cf741f138',
          day_of_week: 1,
          start_time: '09:00:00+08',
          end_time: '17:00:00+08'
        },

        if (!alreadyExists) { // means does not exist (false -> true)
            groups[doctorId].push({
                clinic_id: item[clinicKey],
                day_of_week: item[dayKey],
                start_time: item[startKey],
                end_time: item[endKey]
            });
        }
        */
    }
    // console.log('group', groups[0])
    // console.log('groudps',groups['4d58e6c0-661c-4d7f-b6ad-9b018625e3c9'], 'groudps')
    //   {
    //   clinic_id: '33a4a840-2951-44fe-a2a1-ee0cf741f138',
    //   day_of_week: 1,
    //   start_time: '09:00:00+08',
    //   end_time: '17:00:00+08'
    // },
    // console.log(groups)

    // const convert = Object.entries(groups).map(([doctorId, slots]) => ({
    //     doctorId,
    //     slots 
    // }));

    // turns 2d array, groups
    const convert = Object.entries(groups).map(([doctorId, slots]) => {
      return {
        doctorId,
        clinic_id: slots[0][clinicKey],
        start_time: slots[0][startKey],
        end_time: slots[0][endKey],
        day_of_week: slots[0][dayKey],
        // slots,
      }

    });

    // console.log(convert[0].slots, 'convert')

    return convert;
}

export const createTimeSlots = async (
  doctor_id: string,
  clinic_id: string,
  slot_date: string,        // e.g. "2025-05-27"
  start_time: string,       // e.g. "09:00:00+08:00"
  end_time: string,         // e.g. "17:00:00+08:00"
  is_booked: boolean,
  appointment_id = null,
  amountDays: number,
  doctorSchedule: number[]  // e.g. [1, 2, 3, 4]
) => {
  try {
    // console.log('cliniciD', clinic_id, '-----------------')
    const baseDate = new Date(`${slot_date}T00:00:00Z`);
    const slots = [];

    for (let i = 0; i < amountDays; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setUTCDate(currentDate.getUTCDate() + i);

      const dayOfWeek = currentDate.getUTCDay();

      if (doctorSchedule.includes(dayOfWeek)) {
        // Construct full ISO datetime with timezone for start and end

        // format must be <09:00:00+08:00> time + timezone
        const startISO = new Date(`${slot_date}T${start_time}:00`);
        const endISO = new Date(`${slot_date}T${end_time}:00`);
        

        const startUTC = new Date(startISO.getTime() + i * 24 * 60 * 60 * 1000);
        const endUTC = new Date(endISO.getTime() + i * 24 * 60 * 60 * 1000);

        let currentSlotTime = new Date(startUTC);

        while (currentSlotTime < endUTC) {
          const slotStart = new Date(currentSlotTime);
          const slotEnd = new Date(currentSlotTime.getTime() + 30 * 60000);

          slots.push([
            uuidv4(),
            doctor_id,
            clinic_id,
            currentDate.toISOString().slice(0, 10), // "YYYY-MM-DD"
            slotStart.toISOString(),               // in UTC
            slotEnd.toISOString(),                 // in UTC
            is_booked,
            appointment_id
          ]);

          currentSlotTime.setTime(slotEnd.getTime());
        }
      }
    }
    // console.log(slots);

    return slots;
  } catch (error) {
    throw error
  }
};

/*
export const extractProperties = (
    listOfData: any, 
    [ doctorKey, dayKey, clinicKey, startKey, endKey ]: any
) => {
    console.log(listOfData, '+++')

    {
      doctorId: ""
      clinicId: ""
      start_time: 
      end_time:
      day_of_week: [1,2,3,4,5]
    }
    
    1. Organize by doctor
    
    doctorId: {
      clinic_id:
      day_of_week: []
      start_time:
      end_time
    }
    const groups: Record<string, any[]> = {};

    for (const item of listOfData) {
        // console.log('item',item);
        const doctorId = item[doctorKey];

        if (!groups[doctorId]) {
            groups[doctorId] = []
        }
        // console.log('helo',groups[doctorId])

        const alreadyExists = groups[doctorId].some(entry =>
            entry.day_of_week === item[dayKey] &&
            entry.clinic_id === item[clinicKey] &&
            entry.start_time === item[startKey] &&
            entry.end_time === item[endKey]
        );

        if (!alreadyExists) { // means does not exist (false -> true)
            groups[doctorId].push({
                clinic_id: item[clinicKey],
                day_of_week: item[dayKey],
                start_time: item[startKey],
                end_time: item[endKey]
            });
        }
    }
    console.log('group', groups)
    // console.log('groudps',groups['4d58e6c0-661c-4d7f-b6ad-9b018625e3c9'], 'groudps')
    //   {
    //   clinic_id: '33a4a840-2951-44fe-a2a1-ee0cf741f138',
    //   day_of_week: 1,
    //   start_time: '09:00:00+08',
    //   end_time: '17:00:00+08'
    // },
    // console.log(groups)

    const convert = Object.entries(groups).map(([doctorId, slots]) => ({
        doctorId,
        slots 
    }));

    // console.log(convert[0].slots, 'convert')

    return convert;
}
*/

/*



export const createTimeSlots = async (
    doctor_id  : string, 
    clinic_id  : string, 
    slot_date  : string, 
    start_time  : string, 
    end_time  : string, 
    is_booked  : boolean, 
    appointment_id = null,
    amountDays: number,
    doctorSchedule: any
) => {
    try {
        console.log('doctor_id', doctor_id)
        const baseDate = new Date(slot_date);
        const slots = [];

        for (let i = 0; i < amountDays; i++) {
            const currentDate = new Date(baseDate);
            currentDate.setDate(currentDate.getDate() + i);

            const dayOfWeek = currentDate.getDay();

            if (doctorSchedule.includes(dayOfWeek)) {
                const currentSlotTime = new Date(currentDate);
                const [startHour, startMin] = new Date(start_time).toTimeString().split(':');
                const [endHour, endMin] = new Date(end_time).toTimeString().split(':');

                currentSlotTime.setHours(Number(startHour), Number(startMin), 0, 0);
                const endSlotTime = new Date(currentDate);
                endSlotTime.setHours(Number(endHour), Number(endMin), 0, 0);

                while (currentSlotTime < endSlotTime) {
                    const slotStart = new Date(currentSlotTime);
                    const slotEnd = new Date(currentSlotTime.getTime() + 30 * 60000);

                    slots.push([
                        uuidv4(),
                        doctor_id,
                        clinic_id,
                        currentDate.toISOString().slice(0, 10), 
                        slotStart,
                        slotEnd,
                        is_booked,
                        null
                    ]);
                    currentSlotTime.setTime(slotEnd.getTime());
                }       
            }
        }
        return slots
    } catch (error) {
        throw error
    }
}

*/