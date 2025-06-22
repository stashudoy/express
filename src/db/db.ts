

export type ProductType = {
    id: number,
    title: string
  }
  
export  type AddressType = {
    id: number,
    value: string
  }

 

export let db: {products:ProductType[], addresses: AddressType[]} = {
    products:[{id:1, title: 'tomato'},{id:2,title:'orange'}],
    addresses:[{id:1, value: 'Moscow'},{id:2, value: 'London'}]
  }

  export type DBType = {products:ProductType[], addresses: AddressType[]}   