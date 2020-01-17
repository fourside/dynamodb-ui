
export class Model {

  fields: string[];
  constructor(object :any) {
    this.fields = this.extractFields(Object.keys(object));
    this.fields.forEach(field => {
      this.defineGet(field, object[field]);
    });
  }

  private extractFields(originalFields :string[]) :string[] {
    const fields = originalFields.filter(field => {
      return field !== "__typename"
        && field !== "id"
        && field !== "createdAt"
        && field !== "updatedAt"
      ;
    });
    fields.unshift("id");
    fields.push("createdAt");
    fields.push("updatedAt");
    return fields;
  }

  private defineGet(field :string, actualValue :any) {
    let returnValue = "";
    switch (typeof actualValue) {
      case "object":
        if (actualValue === null) {
          returnValue = "null";
        } else if (Array.isArray(actualValue)) {
          if (actualValue.length > 0 && isS3Object(actualValue[0])) {
            returnValue = actualValue.map(v => new S3Object(v).url).join(", ");
          } else {
            returnValue = actualValue.join(", ");
          }
        } else if (isS3Object(actualValue)) {
          returnValue = (new S3Object(actualValue)).url;
        }
        break;
      case "undefined":
        returnValue = "undefined";
        break;
      default:
        returnValue = actualValue;
    }
    Object.defineProperty(this, field, { get: () => returnValue });
  }

}

class S3Object {

  bucket: string
  region: string
  key: string
  
  constructor(object :any) {
    this.bucket = object.bucket;
    this.region = object.region;
    this.key = object.key;
  }

  get url() :string {
    return `https://console.aws.amazon.com/s3/object/${this.bucket}/public/${this.key}?region=${this.region}`;
  }

}

const isS3Object = (object :any) :object is S3Object => {
  return object.bucket && object.region && object.key;
}

export function getFields(models :Model[]) {
  const fields :string[] = [];
  models.forEach(model => {
    model.fields.forEach(key => {
      if (!fields.includes(key)) {
        fields.push(key);
      }
    })
  });
  return fields;
}

export function toModel(object :any) {
  return new Model(object);
}