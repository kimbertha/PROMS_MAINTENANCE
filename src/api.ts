
export const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSUzI1NmluT1RBIiwibmFtZSI6ICJDb3JlYnJpZGdlIElBIFBST01TIE5vblByb2QifQ.EiEn_7-IhwXqpTaj0zLD21d9gO45t1OehHDK5nODVxIh7kUuq4G0H2Rg1_ivyDyo_EAbtBj6hcxvU7OTaqnw220IB_nmx80IY5rYP1PKGDRsRxUZVYUzCs8bE23cRE_fIw00bWScg6utGQuOSs0NPrkL1iGTGV7HjIoLPcn0AOn2QsoywECDZBrchpDPfM4BnJ0gFzehFzALVa6y3vybrSQ40dE_0qNfuwYCYxVYFqsIcpfwVkZSqXhebYdAePG-O4qz1qPROqRGT3F0exj_hUir8lscA7J1u6KAat6sXpeeNOEYJ_sv5gEzi48iBx4e46xKjmiMHYzmL6EkGhNnhA'
export const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export const dataURL = (server, instance) => `https://${server}.radleypropertysolutions.com/${instance}/promsrest/getmpaneldata`

export const dataObj = [
  // {
  //   id: 'delta',
  //   title: 'Fake',
  //   instances: [{
  //     id: 'tesst',
  //     title: 'Fake'
  //   },
  //   {
  //     id: 'template',
  //     title: 'Template'
  //   }]
  // },
  {
    id: 'delta',
    title: 'Delta',
    instances: [{
      id: 'test',
      title: 'Test'
    },
    {
      id: 'template',
      title: 'Template'
    }]
  },
  {
    id: 'echo',
    title: 'Echo',
    instances: [{
      id: 'test',
      title: 'Test'
    }]
  },
  {
    id: 'aig-cold',
    title: 'Cold',
    instances: [{
      id: 'amdev',
      title: 'Test'
    }]
  }
]