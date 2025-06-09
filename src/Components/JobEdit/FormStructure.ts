export interface FormField {
  Name: string;
  Label: string;
  Index: number;
  Type: string;
  Required: boolean;
  InstantUpdate: boolean;
  PlaceHolder: string | null;
  Options: FieldOption | null;
  Value: string | null;
}

export interface FieldOption {
  [key: string]: string;
}
