
// function update(updateData) {
//     const updateFields= {};
    
//     for (const key in updateData) {
//         if (updateData[key] !== undefined) {
//             updateFields[key] = updateData[key]
//             console.log(updateFields[key])
//         }
//     }
//     console.log(updateFields)

// }

// const updateData = {
//     key1: "Value 1",
//     key2: "Value 2",
//     key3: "Value 3"
// }

// update(updateData);


// const db = await connectDB();
// const result = await db.query(
//     'UPDATE clinics SET name = $1, address = $2 WHERE id = $3 RETURNING *',
//     [data.name, data.address, data.id]
// );
const data = {
    id: '111',
    name: 'fred',
    address: 'somewhere'
}

const keys = Object.keys(data);
console.log(keys)


const placeholders = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
console.log(placeholders)

const values = keys.map(key => data[key]);
console.log(values)
