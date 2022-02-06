use marine_rs_sdk::marine;
use marine_sqlite_connector;
use marine_sqlite_connector::{Connection};
// use marine_sqlite_connector::{Connection, Value};

use crate::get_connection;

pub fn create_table(conn: &Connection) -> std::result::Result<(), marine_sqlite_connector::Error> {
    let res = conn.execute(
        "
        create table if not exists pb_env (
            e text  not null primary key, 
            k text not null, 
        );
        ",
    );
    res
}


#[marine]
pub fn getsome(){
    let conn = get_connection();
}
// pub fn update_pb_env(data_string: String) -> UpdateResult {
//     if !is_owner() {
//         return UpdateResult {
//             success: false,
//             err_str: "You are not the owner".into(),
//         };
//     }

//     let obj: serde_json::Value = serde_json::from_str(&data_string).unwrap();
//     let obj = obj["result"].clone();

//     let conn = get_connection();

//     let insert = "insert or ignore into pb_env(?, ?, ?, ?)";
//     let mut ins_cur = conn.prepare(insert).unwrap().cursor();

//     let insert = ins_cur.bind(&[
//         Value::String(obj["e"].to_string()),
//         Value::String(obj["k"].to_string())
//     ]);

//     if insert.is_ok() {
//         ins_cur.next().unwrap();
//         let mut select = conn
//             .prepare("select * from pb_env")
//             .unwrap()
//             .cursor();
//         while let Some(row) = select.next().unwrap() {
//             println!("select row {:?}", row);
//             println!(
//                 "{}, {}",
//                 row[0].as_integer().unwrap(),
//                 row[2].as_string().unwrap()
//             );
//         }
//         return UpdateResult {
//             success: true,
//             err_str: "".into(),
//         };
//     }

//     UpdateResult {
//         success: false,
//         err_str: "Insert failed".into(),
//     }
// }

// #[marine]
// pub fn get_pb_env() -> PbEnv {
//     // let db_path = "/tmp/db.sqlite";
//     let conn = get_connection();
//     let mut pb_env = PbEnv::from_err();

//     let select = conn.prepare("select * from pb_env order by e desc limit 1");
//     let result = match select {
//         Ok(s) => {
//             let mut select = s.cursor();
//             while let Some(row) = select.next().unwrap() {
//                 println!("get_envs: {:?}", row);
//                 pb_env = PbEnv::from_row(row);
//             }
//             return pb_env;
//         }
//         Err(e) => pb_env,
//     };
//     result
// }
