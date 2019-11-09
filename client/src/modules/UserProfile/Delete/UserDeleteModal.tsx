import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import { updateUserOrToken } from '#/store/JwtStore/actions';
import { UserFromTokenActions, UserFromTokenTypes } from '#/store/JwtStore/constants';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import useLocalStorage from 'react-use-localstorage';
import * as C from './constants';

export interface UserProfileModalProps {
   className?: string;
}

const UserDeleteModal: React.FC<UserProfileModalProps> = ({ className }) => {
   const [open, setOpen] = React.useState(false);
   const [userDeleted, setUserDeleted] = React.useState(false);
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const params: { userId?: string } = useParams();
   const dispatch = useDispatch();
   const [_, setToken] = useLocalStorage('jwt-token', '');
   const [serverError, setServerError] = React.useState<string | boolean>(false);

   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleUserDelete = async () => {
      try {
         const response = await fetch(`/api/users/${params.userId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
         });
         const data = await response.json();

         if (data.error) {
            return setServerError(data.error);
         }

         setUserDeleted(true);
         setToken('');
         dispatch(updateUserOrToken({ token: '', user: {} }));
      } catch (err) {
         if (err.message) {
            setServerError(err.message);
         } else {
            setServerError(JSON.stringify(err));
         }
      }
   };

   return (
      <div>
         {(!params.userId || userDeleted) && <Redirect to="/" />}
         {serverError
            ? <ErrorChip text={serverError} />
            : (
               <>
                  <Button
                     variant="outlined"
                     size="small"
                     color="secondary"
                     onClick={handleClickOpen}
                     className={className}
                  >
                     {C.ModalTexts.Button}
                  </Button>
                  <Dialog
                     fullScreen={fullScreen}
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="responsive-dialog-title"
                  >
                     <DialogTitle id="responsive-dialog-title">{C.ModalTexts.Title}</DialogTitle>
                     <DialogContent>
                        <DialogContentText>
                           {C.ModalTexts.Body}
                        </DialogContentText>
                     </DialogContent>
                     <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                           {C.ModalTexts.Disagree}
                        </Button>
                        <Button onClick={handleUserDelete} color="primary" autoFocus>
                           {C.ModalTexts.Confirm}
                        </Button>
                     </DialogActions>
                  </Dialog>
               </>
            )}
      </div>
   );

};

export default UserDeleteModal;
