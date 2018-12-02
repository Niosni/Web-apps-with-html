/**
 * 
 * 
 */

function displayInvoice() {
	document.getElementById("invoiceInfo").style.display =
		"block";
	document.getElementById("code").innerHTML = '<svg id="barcode"></svg>';
	c = document.getElementById("input").value;
	JsBarcode("#barcode",c);
	
	iban = c.slice(1,17);
	amount = parseInt(c.slice(17,23), 10) + "," + c.slice(23,25);
	ref = parseInt(c.slice(25,48), 10).toString();
	if (c.slice(50,52) != "00") {
		date = c.slice(52,54)+"."+c.slice(50,52)+".20"+c.slice(48,50);
	} else {
		date = "None"
	}
	document.getElementById("iban").innerHTML = iban;
	document.getElementById("amount").innerHTML = amount;
	document.getElementById("ref").innerHTML = ref;
	document.getElementById("date").innerHTML = date;
}

function toggle(){
	var t = document.getElementById("toggle");
	var info = document.getElementById("invoiceInfo");
	if (t.value === "Hide") {
		t.value = "Show";
		info.style.display = "none";
	} else {
		t.value = "Hide";
		info.style.display = "block";
	}
}