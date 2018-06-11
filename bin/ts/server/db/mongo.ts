

import {MongoClient} from 'mongodb';
import * as assert from 'assert';


export class MongoDB{

  private static db:any;

  private static url:string;

  constructor(url:string){
    MongoDB.url = url;
    return this;
  }

  public static getDB = () =>{
    MongoClient.connect(MongoDB.url, (err,db:any)=>{
      assert.equal(null, err);
      console.log(`Connected.. to url: ${MongoDB.url}`);
      console.log(db);
      MongoDB.db.close();
      return db;
    });
  }

  public static insert = (data:any, callback:Function) =>{
    console.log(MongoDB.getDB());
    // let collect = MongoDB.getDB().collection('documents');

  }


}
