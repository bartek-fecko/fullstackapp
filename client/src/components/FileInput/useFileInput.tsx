import * as React from 'react';
import * as C from './constants';

export interface ImageFileInputProps {
   id: string;
}

const useFileInput = (fileInputClasses: React.CSSProperties) => {
   const [file, setFile] = React.useState();

   const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         setFile(e.target.files[0]);
      }
   };

   const classes = C.useStyles(fileInputClasses);

   const FileInput: React.FC<ImageFileInputProps> = ({ children, id, ...restProps }) => (
      <div className={classes.root}>
         <input
            {...restProps}
            type="file"
            id={id}
            onChange={fileHandler}
            className={classes.imageFile}
         />
         <label className={classes.label} htmlFor={id}>
            {children}
         </label>
      </div>
   );
   return [FileInput, file, setFile];
};

export default useFileInput;
