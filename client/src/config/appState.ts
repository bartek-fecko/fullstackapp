import { UserInfoState } from '#/store/JwtStore/constants';
import { UsersState } from '#/store/UsersStore/constants';

export default interface AppState {
   userWithToken: UserInfoState;
   users: UsersState;
}
