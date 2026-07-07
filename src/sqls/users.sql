-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT (replace((uuidv7())::text, '-'::text, ''::text))::uuid,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    real_name character varying(50) COLLATE pg_catalog."default",
    avatar character varying(500) COLLATE pg_catalog."default",
    gender smallint,
    status smallint DEFAULT 1,
    last_login_at timestamp with time zone,
    create_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    home_page character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_gender_check CHECK (gender = ANY (ARRAY[0, 1, 2])),
    CONSTRAINT users_status_check CHECK (status = ANY (ARRAY[0, 1]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

COMMENT ON COLUMN public.users.id
    IS '主键ID，使用无连字符的UUID';

COMMENT ON COLUMN public.users.username
    IS '用户名';

COMMENT ON COLUMN public.users.password
    IS '密码哈希值';

COMMENT ON COLUMN public.users.email
    IS '邮箱地址';

COMMENT ON COLUMN public.users.phone
    IS '手机号码';

COMMENT ON COLUMN public.users.real_name
    IS '真实姓名';

COMMENT ON COLUMN public.users.avatar
    IS '头像URL';

COMMENT ON COLUMN public.users.gender
    IS '性别：0-未知，1-男，2-女';

COMMENT ON COLUMN public.users.status
    IS '状态：0-禁用，1-启用';

COMMENT ON COLUMN public.users.last_login_at
    IS '最后登录时间';

COMMENT ON COLUMN public.users.create_time
    IS '创建时间';

COMMENT ON COLUMN public.users.update_time
    IS '更新时间';

COMMENT ON COLUMN public.users.home_page
    IS '用户个人主页id，最大长度255';

-- Trigger: update_users_update_time

-- DROP TRIGGER IF EXISTS update_users_update_time ON public.users;

CREATE OR REPLACE TRIGGER update_users_update_time
    BEFORE UPDATE 
    ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_update_time_column();