const express = require("express");
const router = express.Router();
const soapRequest = require("easy-soap-request");
const { Parser, processors } = require("xml2js");

router.post("/Login", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_SWE_CUSTOMER&receiverParty=&receiverService=&interface=SI_LOGIN&interfaceNamespace=http://swecustomer";
    let sampleHeaders = {
      
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
  
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZSWE_LOGIN_ANG>
        
         <PASSWORD>${req.body.password}</PASSWORD>
         <USERID>${req.body.id}</USERID>
         
      </urn:ZSWE_LOGIN_ANG>
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
      
      res.send(result.Envelope.Body['ZSWE_LOGIN_ANG.Response']);
    });
   
  });

  router.post("/Inquiry", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=MR_CUSTOMERPORTAL&receiverParty=&receiverService=&interface=SI_INQUIRY&interfaceNamespace=http://mrcustomer";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZBAPI_ANGMR_SD_INQUIRYLIST>
        <CUSTOMER_NO>00000000${req.body.id}</CUSTOMER_NO>  
     </urn:ZBAPI_ANGMR_SD_INQUIRYLIST>
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
      res.send(result.Envelope.Body["ZBAPI_ANGMR_SD_INQUIRYLIST.Response"].IT_TAB);
      console.log(result.Envelope.Body)
    });
    
  });
  
  router.post("/Delivery", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=MR_CUSTOMERPORTAL&receiverParty=&receiverService=&interface=SI_DELIVERY&interfaceNamespace=http://mrcustomer";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `   
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
           <urn:ZBAPI_ANGMR_SD_DELIVERYLIST>
              <!--You may enter the following 2 items in any order-->
              <CUSTOMER_NO>00000000${req.body.id}</CUSTOMER_NO>  
           </urn:ZBAPI_ANGMR_SD_DELIVERYLIST>
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
      res.send(result.Envelope.Body["ZBAPI_ANGMR_SD_DELIVERYLIST.Response"].IT_TAB);
      console.log(result.Envelope.Body)
    });
    
  });

  router.post("/Sales", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=MR_CUSTOMERPORTAL&receiverParty=&receiverService=&interface=SI_SALESLIST&interfaceNamespace=http://mrcustomer";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_ANGMR_SD_SALESORDER>
          <!--You may enter the following 3 items in any order-->
          <CUSTOMER_NO>00000000${req.body.id}</CUSTOMER_NO>
          <SALES_ORG>0001</SALES_ORG>
          
       </urn:ZBAPI_ANGMR_SD_SALESORDER>
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
      res.send(result.Envelope.Body["ZBAPI_ANGMR_SD_SALESORDER.Response"].IT_TAB);
    });
    console.log(req.body.id)
  });
  
  router.post("/Invoice", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=MR_CUSTOMERPORTAL&receiverParty=&receiverService=&interface=SI_INVOICE&interfaceNamespace=http://mrcustomer";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZBAPI_ANGMR_SD_INVOICELIST>
           <!--You may enter the following 2 items in any order-->
           <CUSTOMER_NO>00000000${req.body.id}</CUSTOMER_NO>
           
        </urn:ZBAPI_ANGMR_SD_INVOICELIST>
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
      res.send(result.Envelope.Body["ZBAPI_ANGMR_SD_INVOICELIST.Response"].IT_TAB);
    });
    console.log(req.body.id)
  });
  
  
  router.post("/Memo", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=MR_CUSTOMERPORTAL&receiverParty=&receiverService=&interface=SI_MEMO&interfaceNamespace=http://mrcustomer";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZBAPI_ANGMR_SD_MEMOLIST>
           <!--You may enter the following 3 items in any order-->
           <CUSTOMER_NO>00000000${req.body.id}</CUSTOMER_NO>
           
        </urn:ZBAPI_ANGMR_SD_MEMOLIST>
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
      res.send(result.Envelope.Body["ZBAPI_ANGMR_SD_MEMOLIST.Response"]);
    });
    console.log(req.body.id)
  });
  
  
  router.post("/Payments", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=MR_CUSTOMERPORTAL&receiverParty=&receiverService=&interface=SI_PAYMENTS&interfaceNamespace=http://mrcustomer";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZBAPI_ANGMR_SD_PAYMENTS>
           <!--You may enter the following 3 items in any order-->
           <COMPANY_CODE>0001</COMPANY_CODE>
           <CUSTOMER_NO>00000000${req.body.id}</CUSTOMER_NO>
           <!--Optional:-->
         
        </urn:ZBAPI_ANGMR_SD_PAYMENTS>
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
      res.send(result.Envelope.Body["ZBAPI_ANGMR_SD_PAYMENTS.Response"].IT_TAB);
    });
    console.log(req.body.id)
  });

  module.exports = router;