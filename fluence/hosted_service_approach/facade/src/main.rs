use marine_rs_sdk::marine;
// use marine_sqlite_connector;
// use marine_sqlite_connector::{Connection, State, Value};
use marine_sqlite_connector::{Connection};

// use serde::Deserialize;
// use serde_json;
// use std::path::{Path, PathBuf};

use std::sync::atomic::{AtomicBool, Ordering};

use crate::crud::create_table;

const DB_PATH: &str = "/tmp/db.sqlite";

mod crypto;
mod crud;

pub static INIT: AtomicBool = AtomicBool::new(false);

fn main() {}

fn get_connection() -> Connection {
    Connection::open(DB_PATH).unwrap()
}

#[marine]
#[derive(Debug)]
pub struct InitResult {
    pub success: bool,
    pub err_msg: String,
}

#[marine]
pub fn init_service() -> InitResult {

    if INIT.load(Ordering::Relaxed) {
        return InitResult {
            success: false,
            err_msg: "Service already initiated".into(),
        };
    }

    let conn = get_connection();
    let res = create_table(&conn);
    if res.is_err() {
        return InitResult {
            success: false,
            err_msg: "Failure to create tables".into(),
        };
    }
    // TODO: rollbacks?

    INIT.store(true, Ordering::Relaxed);
    InitResult {
        success: true,
        err_msg: "".into(),
    }
}
