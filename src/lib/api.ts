
export const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSUzI1NmluT1RBIiwibmFtZSI6ICJDb3JlYnJpZGdlIElBIFBST01TIE5vblByb2QifQ.EiEn_7-IhwXqpTaj0zLD21d9gO45t1OehHDK5nODVxIh7kUuq4G0H2Rg1_ivyDyo_EAbtBj6hcxvU7OTaqnw220IB_nmx80IY5rYP1PKGDRsRxUZVYUzCs8bE23cRE_fIw00bWScg6utGQuOSs0NPrkL1iGTGV7HjIoLPcn0AOn2QsoywECDZBrchpDPfM4BnJ0gFzehFzALVa6y3vybrSQ40dE_0qNfuwYCYxVYFqsIcpfwVkZSqXhebYdAePG-O4qz1qPROqRGT3F0exj_hUir8lscA7J1u6KAat6sXpeeNOEYJ_sv5gEzi48iBx4e46xKjmiMHYzmL6EkGhNnhA'
export const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

//instance URLS
export const dataURL = (server : string, instance:string ) => `https://${server}.radleypropertysolutions.com/${instance}/promsrest/getmpaneldata`
export const pingURL = (server: string, instance: string) => `https://${server}.radleypropertysolutions.com/${instance}/#userlogin.jsp`
// export const logFilesURL = (server: string, instance: string) =>`https://${server}.radleypropertysolutions.com/test/promsrest/getmpanellogfile/${instance}`
export const logFilesURL = (server: string, instance: string) =>'https://delta.radleypropertysolutions.com/test/promsrest/getmpanellogfile/demo'
//server URLS
export const serverLogFilesURL = (server: string, instance: string) => `https://${server}.radleypropertysolutions.com/${instance}/promsrest/getmpanellogfile/catalina`
export const serverDiskSplitURL = (server: string, instance: string) => ` https://${server}.radleypropertysolutions.com/${instance}/promsrest/getmpanellogfile/disksplit`
export const serverMemoryUrl = (server: string, instance: string) => `https://${server}.radleypropertysolutions.com/${instance}/promsrest/getmpanellogfile/mem`

//hard coded 
export const dataObj = [
  {
    id: 'delta',
    title: 'Delta',
    main: 'test',
    instances: [{
      id: 'test',
      title: 'Test',
      api: true
    },{
      id: 'demo',
      title: 'Demo',
      api: false
    },
    {
      id: 'template',
      title: 'Template',
      api: true
    }]
  },
  {
    id: 'echo',
    title: 'Echo',
    instances: [{
      id: 'test',
      title: 'Test',
      api: true
    },{
      id: 'unittest',
      title: 'Unittest',
      api: false
    },{
      id: 'gatehouse',
      title: 'Gatehouse',
      api: false
    }]
  },
  {
    id: 'aig-cold',
    title: 'Cold',
    instances: [{
      id: 'amdev',
      title: 'Test',
      api: true
    }]
  }
]