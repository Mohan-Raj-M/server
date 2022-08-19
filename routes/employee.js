const express = require("express");
const router = express.Router();
const soapRequest = require("easy-soap-request");
const { Parser, processors } = require("xml2js");

router.post("/EmpProfile", async (req, res) => {
  let url =
    "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_EMPLOYEE&receiverParty=&receiverService=&interface=SI_PROFILE&interfaceNamespace=http://mremployee";
  let sampleHeaders = {
    "Content-Type": "text/xml;charset=UTF-8",
    Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
  };

  const xml = `<?xml version="1.0"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZBAPI_ANGMR_HR_PROFILE>
        <EMPNO>${req.body.id}</EMPNO>
     </urn:ZBAPI_ANGMR_HR_PROFILE>
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
    res.send(result.Envelope.Body['ZBAPI_ANGMR_HR_PROFILE.Response'].PERSONAL_DATA);
    console.log(result.Envelope.Body)
  });
  
});

router.post("/EmpPayslip", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_EMPLOYEE&receiverParty=&receiverService=&interface=SI_SALARY&interfaceNamespace=http://mremployee";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_ANGMR_HR_SALARY>
          <!--You may enter the following 2 items in any order-->
          <EMPNO>${req.body.id}</EMPNO>
          
       </urn:ZBAPI_ANGMR_HR_SALARY>
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
      res.send(result.Envelope.Body['ZBAPI_ANGMR_HR_SALARY.Response'].RESULTS);
      console.log(result.Envelope.Body)
    });
    
  });
  

  
router.post("/EmpLeave", async (req, res) => {
    let url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BS_MR_EMPLOYEE&receiverParty=&receiverService=&interface=SI_LEAVEREQUEST&interfaceNamespace=http://mremployee";
    let sampleHeaders = {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: "Basic UE9VU0VSQDE6VGVjaEAyMDIy",
    };
  
    const xml = `<?xml version="1.0"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZBAPI_ANGMR_HR_LEAVE>
         <!--You may enter the following 2 items in any order-->
         <EMPNO>${req.body.id}</EMPNO>
         
      </urn:ZBAPI_ANGMR_HR_LEAVE>
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
      res.send(result.Envelope.Body['ZBAPI_ANGMR_HR_LEAVE.Response'].ABSENCE);
      console.log(result.Envelope.Body)
    });
    
  });


module.exports = router;