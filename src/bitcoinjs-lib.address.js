//https://raw.github.com/bitcoinjs/bitcoinjs-lib/09e8c6e184d6501a0c2c59d73ca64db5c0d3eb95/src/address.js
Sexcoin.Address = function (bytes) {
	if ("string" == typeof bytes) {
		bytes = Sexcoin.Address.decodeString(bytes);
	}
	this.hash = bytes;
	this.version = Sexcoin.Address.networkVersion;
};

Sexcoin.Address.networkVersion = 0x00; // mainnet

/**
* Serialize this object as a standard Sexcoin address.
*
* Returns the address as a base58-encoded string in the standardized format.
*/
Sexcoin.Address.prototype.toString = function () {
	// Get a copy of the hash
	var hash = this.hash.slice(0);

	// Version
	hash.unshift(this.version);
	var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });
	var bytes = hash.concat(checksum.slice(0, 4));
	return Sexcoin.Base58.encode(bytes);
};

Sexcoin.Address.prototype.getHashBase64 = function () {
	return Crypto.util.bytesToBase64(this.hash);
};

/**
* Parse a Sexcoin address contained in a string.
*/
Sexcoin.Address.decodeString = function (string) {
	var bytes = Sexcoin.Base58.decode(string);
	var hash = bytes.slice(0, 21);
	var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });

	if (checksum[0] != bytes[21] ||
			checksum[1] != bytes[22] ||
			checksum[2] != bytes[23] ||
			checksum[3] != bytes[24]) {
		throw "Checksum validation failed!";
	}

	var version = hash.shift();

	if (version != 0) {
		throw "Version " + version + " not supported!";
	}

	return hash;
};