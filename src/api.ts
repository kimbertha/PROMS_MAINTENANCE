export const getData = 'https://echo.radleypropertysolutions.com/test/promsrest/getmpaneldata'

export const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSUzI1NmluT1RBIiwibmFtZSI6ICJDb3JlYnJpZGdlIElBIFBST01TIE5vblByb2QifQ.EiEn_7-IhwXqpTaj0zLD21d9gO45t1OehHDK5nODVxIh7kUuq4G0H2Rg1_ivyDyo_EAbtBj6hcxvU7OTaqnw220IB_nmx80IY5rYP1PKGDRsRxUZVYUzCs8bE23cRE_fIw00bWScg6utGQuOSs0NPrkL1iGTGV7HjIoLPcn0AOn2QsoywECDZBrchpDPfM4BnJ0gFzehFzALVa6y3vybrSQ40dE_0qNfuwYCYxVYFqsIcpfwVkZSqXhebYdAePG-O4qz1qPROqRGT3F0exj_hUir8lscA7J1u6KAat6sXpeeNOEYJ_sv5gEzi48iBx4e46xKjmiMHYzmL6EkGhNnhA'
export const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}


export const dataObj = [{
  server: 'Delta',
  instances: [{
    title: 'Test',
    url: 'https://delta.radleypropertysolutions.com/test/promsrest/getmpaneldata'
  },
  {
    title: 'Template',
    url: 'https://delta.radleypropertysolutions.com/template/promsrest/getmpaneldata'
  }]
},
{
  server: 'Echo',
  instances: [{
    title: 'Test',
    url: 'https://echo.radleypropertysolutions.com/test/promsrest/getmpaneldata'
  }]
},
{
  server: 'Cold',
  instances: [{
    title: 'Test',
    url: 'https://aig-cold.radleypropertysolutions.com/amdev/promsrest/getmpaneldata'
  }]
}]