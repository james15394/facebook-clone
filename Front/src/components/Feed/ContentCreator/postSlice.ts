import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import * as api from "../../../api";
import { RootState } from "../../../store";

interface Post {
  path?: string;
  createdAt: Date;
  id: string | number;
  author: string;
  message?: string;
  _id: string | number;

  filename?: string;
}
type Id = string | number;
const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) =>
    Date.parse(b.createdAt?.toString()) - Date.parse(a.createdAt?.toString()),
});

const initialState = postAdapter.getInitialState({
  status: "idle",
});
export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await api.fetchPosts();
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: any) => {
    console.log(initialPost);
    const response = await api.createPost(initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (newContent: { postId: any; formData: any }) => {
    console.log(newContent);
    const { postId, formData } = newContent;
    const response = await api.updatePost(postId, formData);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: Id) => {
    console.log(id);
    await api.deletePost(id);
    return { id };
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      postAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
    });

    builder.addCase(addNewPost.fulfilled, postAdapter.addOne);

    builder.addCase(deletePost.fulfilled, (state, action) => {
      const postId = action.payload.id;
      delete state.entities[postId];
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      console.log(action);
      state.status = "failed";
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      console.log(action);
      const { id, message, path } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.message = message;
        existingPost.path = path;
      }
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      console.log(action);
      state.status = "failed";
    });
  },
});

export default postSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state: RootState) => state.post);
