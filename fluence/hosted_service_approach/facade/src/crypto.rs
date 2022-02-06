use ethers::signers::{Signer, LocalWallet};
use ethers::core::types::Signature;
use ethers::core::rand::thread_rng;
// use ethers::types::Address;
use std::{
    fs::File,
    // path::{Path, PathBuf},
};

fn random_bytes() -> [u8; 32] {
    let mut secret = [0u8; 32];
    thread_rng().fill_bytes(&mut secret);
    secret
}

fn load_pk_or_generate() -> String {
    let path = "/tmp/key";
    let secret = match File::open(path) {
        Ok(file) => {
            let key_file: String = serde_json::from_reader(file).unwrap();
            key_file
        }
        Err(_e) => {
            let mut output = File::create(path);
            let key_file: [u8; 32] = random_bytes();
            serde_json::to_writer_pretty(&File::create(&path), &key_file);
            key_file
        }
    };
    secret
    
}

async fn sign_message(message:String) -> String {
    let key = load_pk_or_generate();
    println!("{:?}", key);
    let wallet = LocalWallet::new(&mut key);

    // Sign the message
    let signature = wallet.sign_message(message).await.unwrap();
    
    // TODO: check is need convert?
    return signature.to_string()
}


fn address_from_sign(message:String, sign:String) -> String {
    let signature = Signature::from_str(sign);
    let recovered = signature.recover(message);
    recovered
}

fn check_sign(message:String, sign:String, address:String) -> bool {
    address_from_sign(message, sign) == address
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sign_correct() {
        let key = load_pk_or_generate();
        let from_sign = address_from_sign("hello".to_string(), sign_message("hello".to_string()));
        assert_eq!(key.address(), from_sign);
        let result = from_sign == key;
        assert_eq!(result, check_sign("hello".to_string(), sign_message("hello".to_string()), key.address()));
    }
}