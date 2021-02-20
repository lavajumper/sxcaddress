(function (wallets, qrCode) {
	var single = wallets.singlewallet = {
		isOpen: function () {
			return (document.getElementById("singlewallet").className.indexOf("selected") != -1);
		},

		open: function () {
			if (document.getElementById("btcaddress").innerHTML == "") {
				single.generateNewAddressAndKey();
			}
			document.getElementById("singlearea").style.display = "block";
		},

		close: function () {
			document.getElementById("singlearea").style.display = "none";
		},

		// generate sexcoin address and private key and update information in the HTML
		generateNewAddressAndKey: function () {
			try {
				var key = new Sexcoin.ECKey(false);
				key.setCompressed(true);
				var sexcoinAddress = key.getSexcoinAddress();
				var privateKeyWif = key.getSexcoinWalletImportFormat();
				document.getElementById("btcaddress").innerHTML = sexcoinAddress;
				document.getElementById("btcprivwif").innerHTML = privateKeyWif;
				var keyValuePair = {
					"qrcode_public": sexcoinAddress,
					"qrcode_private": privateKeyWif
				};
				qrCode.showQrCode(keyValuePair, 4);
			}
			catch (e) {
				// browser does not have sufficient JavaScript support to generate a sexcoin address
				alert(e);
				document.getElementById("btcaddress").innerHTML = "error";
				document.getElementById("btcprivwif").innerHTML = "error";
				document.getElementById("qrcode_public").innerHTML = "";
				document.getElementById("qrcode_private").innerHTML = "";
			}
		}
	};
})(ninja.wallets, ninja.qrCode);