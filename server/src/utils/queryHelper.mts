/*
TO-DO
- create dynamic query builder, as of right now it's static for the update
*/

import { CustomError } from "./customError.mjs";

/*
const result = await db.query(
    'UPDATE clinics SET name = $1, address = $2 WHERE id = $3 RETURNING *',
    [data.name, data.address, data.id]
);
*/

export const queryBuilder = (tableName: string, id: string, data: any) => {
    const keys = Object.keys(data);

    if (keys.length === 0) {
        throw new CustomError("No fields to update", 400);
    }

    const toUpdate = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    const values = keys.map(key => data[key as keyof any]);
    values.push(id);
    
    const query = `UPDATE ${tableName} SET ${toUpdate} WHERE id = $${keys.length + 1} RETURNING *`;

    return { query, values };
}

export const queryCreateBuilder = () => {

}

