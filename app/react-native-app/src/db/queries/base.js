import { db } from "db/db";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const queryBase = {
  createTable: (table_name, columnsStore) => {
    let arr = ["id integer primary key not null"];
    for (const key in columnsStore) {
      const type = typeof columnsStore[key] === "number" ? "integer" : "text";
      arr.push(`${key} ${type}`);
    }
    const columnNames = arr.join(", ");
    const sql = `create table if not exists ${table_name} (${columnNames});`;
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        () => {},
        (_, err) => console.log("Error", err)
      );
    });
  },

  insertData: (table_name, dataObj) => {
    const columnsArr = Object.keys(dataObj);
    const placeholderArr = Array.from({ length: columnsArr.length }, () => "?");
    const valueArr = Object.values(dataObj);
    const sql = `insert into ${table_name} (${columnsArr.join(
      ", "
    )}) values (${placeholderArr.join(", ")});`;

    db.transaction((tx) => {
      console.log("Starting data insert transaction");
      tx.executeSql(
        sql,
        valueArr,
        (_, result) => {
          result.rowsAffected > 0
            ? Toast.show({
                type: "success",
                text1: "Initial Consultation record created",
              })
            : Toast.show({
                type: "error",
                text1: "Initial Consultation record creation failed",
              });
        },
        (_, err) => {
          Toast.show({
            type: "error",
            text1: "Transaction failed",
          });
          console.log("Error", err);
        }
      );
    });
  },

  deleteTable: (table_name) => {
    db.transaction((tx) => {
      tx.executeSql(
        `drop table if exists ${table_name}`,
        [],
        () => {
          console.log(`Table ${table_name} deleted successfully`);
        },
        (_, err) => {
          console.log("Error deleting table:", err);
        }
      );
    });
  },

  addMissingColumns: (table_name, columnsStore) => {
    db.transaction((tx) => {
      tx.executeSql(
        `pragma table_info('${table_name}');`,
        [],
        (tx, result) => {
          const columnNames = result.rows.raw().map((column) => column.name);
          const missingColumns = Object.keys(columnsStore).filter(
            (column) => !columnNames.includes(column)
          );

          if (missingColumns.length > 0) {
            const columnDefinitions = missingColumns.map((column) => {
              const type =
                typeof columnsStore[column] === "number" ? "integer" : "text";
              return `${column} ${type}`;
            });

            const sql = `alter table ${table_name} add column ${columnDefinitions.join(
              ", "
            )}`;
            -tx.executeSql(sql);
          }
        },
        (_, error) => console.log("Error", error)
      );
    });
  },

  getData: (table_name, setData) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${table_name}`,
        [],
        (_, result) => {
          setData(result.rows._array);
        },
        (_, error) => {
          console.log("Error during select operation:", error);
        }
      );
    });
  },
};
