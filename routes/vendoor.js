const express = require("express");
const router = express.Router();
const soapRequest = require("easy-soap-request");
const { Parser, processors } = require("xml2js");

router.post("/RFQ", async (req, res) => {
  let url =
    "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_VENDOR&receiverParty=&receiverService=&interface=SI_REQUESTFQ&interfaceNamespace=http://mrvendor";
  let sampleHeaders = {
    "Content-Type": "text/xml;charset=UTF-8",
    Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
  };

  const xml = `<?xml version="1.0"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZBAPI_ANGMR_MM_REQUESTFQUO>
        <!--You may enter the following 2 items in any order-->
        <VENDOR_NO>000000000${req.body.id}</VENDOR_NO>
        
        
     </urn:ZBAPI_ANGMR_MM_REQUESTFQUO>
  </soapenv:Body>
</soapenv:Envelope>
`;

  const { response } = await soapRequest({
    url: url,
    headers: sampleHeaders,
    xml: xml,
  });
  const parser = new Parser({
    trim: true,
    explicitArray: false,
    tagNameProcessors: [processors.stripPrefix],
  });
  parser.parseString(response.body, function (err, result) {
    let data = JSON.stringify(result);
    res.send(result.Envelope.Body['ZBAPI_ANGMR_MM_REQUESTFQUO.Response'].IT_TAB);
    console.log(result.Envelope.Body)
  });
  
});

router.post("/purchaseOrder", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_VENDOR&receiverParty=&receiverService=&interface=SI_PURCHASEORDER&interfaceNamespace=http://mrvendor";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZBAPI_ANGMR_MM_PURSCHASEORDER>
         <!--You may enter the following 2 items in any order-->
         <VENDORNO>${req.body.id}</VENDORNO>
         
      </urn:ZBAPI_ANGMR_MM_PURSCHASEORDER>
   </soapenv:Body>
</soapenv:Envelope>
  `;
  
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
    });
    const parser = new Parser({
      trim: true,
      explicitArray: false,
      tagNameProcessors: [processors.stripPrefix],
    });
    parser.parseString(response.body, function (err, result) {
      let data = JSON.stringify(result);
      res.send(result.Envelope.Body['ZBAPI_ANGMR_MM_PURSCHASEORDER.Response'].IT_TAB);
      console.log(result.Envelope.Body)
    });
    
  });

  router.post("/goodsList", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_VENDOR&receiverParty=&receiverService=&interface=SI_GOODSLIST&interfaceNamespace=http://mrvendor";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZBAPI_ANGMR_MM_GOODSLIST>
         <!--You may enter the following 4 items in any order-->
         <VENDORNO>${req.body.id}</VENDORNO>
      </urn:ZBAPI_ANGMR_MM_GOODSLIST>
   </soapenv:Body>
</soapenv:Envelope>
  `;
  
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
    });
    const parser = new Parser({
      trim: true,
      explicitArray: false,
      tagNameProcessors: [processors.stripPrefix],
    });
    parser.parseString(response.body, function (err, result) {
      let data = JSON.stringify(result);
      res.send(result.Envelope.Body['ZBAPI_ANGMR_MM_GOODSLIST.Response']);
      console.log(result.Envelope.Body)
    });
    
  });

  router.post("/vendorInvoice", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_VENDOR&receiverParty=&receiverService=&interface=SI_INVOICE&interfaceNamespace=http://mrvendor";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_ANGMR_MM_INVOICE>
          <!--You may enter the following 3 items in any order-->
          <VENDORNO>${req.body.id}</VENDORNO>
          
       </urn:ZBAPI_ANGMR_MM_INVOICE>
    </soapenv:Body>
 </soapenv:Envelope>
  `;
  
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
    });
    const parser = new Parser({
      trim: true,
      explicitArray: false,
      tagNameProcessors: [processors.stripPrefix],
    });
    parser.parseString(response.body, function (err, result) {
      let data = JSON.stringify(result);
      res.send(result.Envelope.Body['ZBAPI_ANGMR_MM_INVOICE.Response'].INVOICE);
      console.log(result.Envelope.Body)
    });
    
  });


  router.post("/vendorMemo", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_VENDOR&receiverParty=&receiverService=&interface=SI_MEMO&interfaceNamespace=http://mrvendor";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_ANGMR_MM_MEMO>
         
          <VENDORNO>${req.body.id}</VENDORNO>
          
       </urn:ZBAPI_ANGMR_MM_MEMO>
    </soapenv:Body>
 </soapenv:Envelope>
  `;
  
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
    });
    const parser = new Parser({
      trim: true,
      explicitArray: false,
      tagNameProcessors: [processors.stripPrefix],
    });
    parser.parseString(response.body, function (err, result) {
      let data = JSON.stringify(result);
      res.send(result.Envelope.Body['ZBAPI_ANGMR_MM_MEMO.Response']);
      console.log(result.Envelope.Body)
    });
    
  });

  router.post("/vendorPayments", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_VENDOR&receiverParty=&receiverService=&interface=SI_PAYMENTS&interfaceNamespace=http://mrvendor";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_ANGMR_MM_PAYMENTS>
          <!--You may enter the following 2 items in any order-->
          <VENDORNO>${req.body.id}</VENDORNO>
          
       </urn:ZBAPI_ANGMR_MM_PAYMENTS>
    </soapenv:Body>
 </soapenv:Envelope>
  `;
  
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
    });
    const parser = new Parser({
      trim: true,
      explicitArray: false,
      tagNameProcessors: [processors.stripPrefix],
    });
    parser.parseString(response.body, function (err, result) {
      let data = JSON.stringify(result);
      res.send(result.Envelope.Body['ZBAPI_ANGMR_MM_PAYMENTS.Response'].IT_TAB);
      console.log(result.Envelope.Body)
    });
    
  });


module.exports = router;