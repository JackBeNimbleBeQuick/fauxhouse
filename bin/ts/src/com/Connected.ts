/// <reference path="./interfaces.d.ts"/>

export class Connected{

	//Keep for reference event though query stats are now stripped out
	private MEDIA_TYPES:string[] = ["application/json", "application/x-www-form-urlencoded", "text/plain", "text/html"];

  private xhr: XMLHttpRequest;


	//Keep for reference event though query stats are now stripped out
  private states:comState = {
    0: {key: 'UNSENT', explained: 'Client has been created. open() not called yet.'},
    1: {key: 'OPENED', explained: 'open() has been called.'},
    2: {key: 'HEADERS_RECEIVED', explained: 'send() has been called, and headers and status are available.'},
    3: {key: 'LOADING', explained: 'Downloading the responseText. Partial data received'},
    4: {key: 'DONE', explained: 'Well explains its self don\'t it '},
  }


  public constructor(){
  }

	private requester(){
		 try { return new XMLHttpRequest();											} catch(e){}
		 try { return new ActiveXObject('Msxml2.XMLHTTP.6.0');	} catch(e){}
		 try { return new ActiveXObject('Msxml2.XMLHTTP.3.0');	} catch(e){}
		 try { return new ActiveXObject('Msxml2.XMLHTTP');			} catch(e){}
		 try { return new ActiveXObject('Microsoft.XMLHTTP');		} catch(e){}
		 return null;
	}

  public send = (postage:postage, success:Function, failure:Function) => {
		this.xhr = this.requester();
    this.xhr.open(this.getType(postage), postage.url , true);
		this.setHeaders();
    if(postage.setCORS && postage.setCORS == true) this.setCORSRequest();
    let xhr_ = this.xhr;
    this.xhr.onreadystatechange = () => {
      if (xhr_.readyState == XMLHttpRequest.DONE) {
        if(xhr_.status == 200){
          return success(xhr_.responseText);
        }else{
	        return failure(xhr_.responseText);
				}
      }
    }
    xhr_.send(postage.data);
  }

	//@NOTE server side Response Headers... @FIXME
	private setCORSRequest = () => {
		this.xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
		this.xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		return this.xhr;
	}

	private setHeaders= () => {
		this.xhr.setRequestHeader("Content-Type","application/json");
		this.xhr.setRequestHeader("Accept","application/json");
		return this.xhr;
	}

   private getType(datum:postage){
    let matchable = datum.type.match(/\b(post|get|delete|put)\b/i);
    if(matchable &&matchable.length > 0 ) return matchable[0].toUpperCase();
    return 'POST';
  }

}
