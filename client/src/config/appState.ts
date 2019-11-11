import { UserInfoState } from '#/store/JwtStore/constants';
import { PostsState } from '#/store/PostsStore/constants';
import { UsersState } from '#/store/UsersStore/constants';

export default interface AppState {
   userWithToken: UserInfoState;
   posts: PostsState;
   users: UsersState;
}
