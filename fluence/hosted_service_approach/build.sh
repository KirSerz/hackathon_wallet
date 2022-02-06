#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

cd ../facade
cargo update --aggressive
marine build --release
cd ..

mkdir -p artifacts
rm -f artifacts/*.wasm

cp facade/target/wasm32-wasi/release/facade.wasm artifacts/

cd artifacts 
wget https://github.com/fluencelabs/sqlite/releases/download/v0.15.0_w/sqlite3.wasm
cd ..