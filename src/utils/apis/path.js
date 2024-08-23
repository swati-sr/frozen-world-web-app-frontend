export const AUTH_PATH = {
  SIGN_UP: "/user/signup",
  SIGN_IN: "/login", 
};

export const CATEGORY_PATH = {
    LIST: "/category",
    LIST_BY_ID: "/category/:id",
    CREATE: "/category/create",
    UPDATE: "/category/update/:id",
    DELETE: "/category/:id",
    LIST_BY_PARENT_ID: "/category/byParent/:id",
    ROOT: "/category/root",
    UPLOAD_IMAGE: "/category/upload/:id",
};

export const PRODUCT_PATH = {
    LIST: "/product/",
    LIST_BY_ID: "/product/:id",
    CREATE: "/product/",
    UPDATE: "/product/:id",
    DELETE: "/product/:id",
    LIST_BY_CATEGORY_ID: "/product/category?categoryId=",
    UPLOAD_IMAGE: "/product/upload/:id",   
};

export const USER_PATH = {
    LIST : "/user/userDetails",
    UPDATE_PASSWORD: "/user/updatePassword",
    UPDATE_USER: "/user/updateUser",
    UPLOAD_IMAGE: "/user/upload",
};
