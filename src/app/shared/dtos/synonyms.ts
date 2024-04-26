export interface Synonym {
    response: Response[]
  }
  
  export interface Response {
    list: List
  }
  
  export interface List {
    category: string
    synonyms: string
  }
  