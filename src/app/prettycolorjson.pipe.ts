import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettycolorjson',
  pure: true
})
export class PrettycolorjsonPipe implements PipeTransform {

  transform(valueNew: any, args: any[]): any {
    try {
      return this.applyColors(
        JSON.parse(JSON.stringify(valueNew)),args[0]
      );
    } catch (e) {
      console.log("Pipe called - "+e);
      return this.applyColors({ error: 'Invalid JSON' }, "error");
    }
  }

  applyColors(obj: any, changedAttr:string) {

        let showNumebrLine = false;
        let padding = 4;
        // line number start from 1
        let line = 1;
        if (typeof obj != 'string') {
          console.log("Obj - "+JSON.stringify(obj,null)+", changed attr - "+changedAttr);
          if(changedAttr in obj){
            let value = obj[changedAttr as keyof typeof obj];
            console.log("changed attribute - {}",value);
          }
          
          
          obj = JSON.stringify(obj, undefined, 3);
        
        }

        return obj;
    
      }
  }

