PGDMP                          {           employedbulls    15.1    15.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16638    employedbulls    DATABASE     �   CREATE DATABASE employedbulls WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE employedbulls;
                postgres    false            �            1259    16726    job    TABLE     m  CREATE TABLE public.job (
    jobid integer NOT NULL,
    company_name character varying(255) NOT NULL,
    position_name character varying(255) NOT NULL,
    jobdescription text NOT NULL,
    recruiter_id integer NOT NULL,
    applied_student text[],
    applied boolean,
    location character varying(255),
    apply character varying(50),
    hiring integer
);
    DROP TABLE public.job;
       public         heap    postgres    false            �            1259    16725    job_jobid_seq    SEQUENCE     �   CREATE SEQUENCE public.job_jobid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.job_jobid_seq;
       public          postgres    false    220                       0    0    job_jobid_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.job_jobid_seq OWNED BY public.job.jobid;
          public          postgres    false    219            �            1259    16690 	   recruiter    TABLE     �   CREATE TABLE public.recruiter (
    rid integer NOT NULL,
    name character varying(255),
    email character varying(255),
    phone character varying(20),
    company character varying(255),
    verified boolean,
    password character varying(255)
);
    DROP TABLE public.recruiter;
       public         heap    postgres    false            �            1259    16708    student    TABLE     �  CREATE TABLE public.student (
    uid integer NOT NULL,
    email character varying(255) NOT NULL,
    resume text,
    applied_jobs text[],
    password character varying(255) NOT NULL,
    cover_letter text,
    degree character varying(255),
    major character varying(255),
    availability character varying(255),
    job_history text[],
    preferred_job_type character varying(255),
    name character varying(55) NOT NULL
);
    DROP TABLE public.student;
       public         heap    postgres    false            �            1259    16707    student_uid_seq    SEQUENCE     �   CREATE SEQUENCE public.student_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.student_uid_seq;
       public          postgres    false    218                       0    0    student_uid_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.student_uid_seq OWNED BY public.student.uid;
          public          postgres    false    217            �            1259    16698    users    TABLE     �   CREATE TABLE public.users (
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    recruiter boolean DEFAULT false NOT NULL,
    student boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16689    users_rid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_rid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.users_rid_seq;
       public          postgres    false    215                       0    0    users_rid_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.users_rid_seq OWNED BY public.recruiter.rid;
          public          postgres    false    214            w           2604    16729 	   job jobid    DEFAULT     f   ALTER TABLE ONLY public.job ALTER COLUMN jobid SET DEFAULT nextval('public.job_jobid_seq'::regclass);
 8   ALTER TABLE public.job ALTER COLUMN jobid DROP DEFAULT;
       public          postgres    false    219    220    220            s           2604    16693    recruiter rid    DEFAULT     j   ALTER TABLE ONLY public.recruiter ALTER COLUMN rid SET DEFAULT nextval('public.users_rid_seq'::regclass);
 <   ALTER TABLE public.recruiter ALTER COLUMN rid DROP DEFAULT;
       public          postgres    false    215    214    215            v           2604    16711    student uid    DEFAULT     j   ALTER TABLE ONLY public.student ALTER COLUMN uid SET DEFAULT nextval('public.student_uid_seq'::regclass);
 :   ALTER TABLE public.student ALTER COLUMN uid DROP DEFAULT;
       public          postgres    false    218    217    218                      0    16726    job 
   TABLE DATA           �   COPY public.job (jobid, company_name, position_name, jobdescription, recruiter_id, applied_student, applied, location, apply, hiring) FROM stdin;
    public          postgres    false    220   (!                 0    16690 	   recruiter 
   TABLE DATA           Y   COPY public.recruiter (rid, name, email, phone, company, verified, password) FROM stdin;
    public          postgres    false    215   #                 0    16708    student 
   TABLE DATA           �   COPY public.student (uid, email, resume, applied_jobs, password, cover_letter, degree, major, availability, job_history, preferred_job_type, name) FROM stdin;
    public          postgres    false    218   �#                 0    16698    users 
   TABLE DATA           D   COPY public.users (email, password, recruiter, student) FROM stdin;
    public          postgres    false    216   �#                  0    0    job_jobid_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.job_jobid_seq', 1, false);
          public          postgres    false    219                        0    0    student_uid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.student_uid_seq', 1, false);
          public          postgres    false    217            !           0    0    users_rid_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.users_rid_seq', 1, false);
          public          postgres    false    214                       2606    16733    job job_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (jobid);
 6   ALTER TABLE ONLY public.job DROP CONSTRAINT job_pkey;
       public            postgres    false    220            }           2606    16715    student student_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (uid);
 >   ALTER TABLE ONLY public.student DROP CONSTRAINT student_pkey;
       public            postgres    false    218            y           2606    16697    recruiter users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT users_pkey PRIMARY KEY (rid);
 >   ALTER TABLE ONLY public.recruiter DROP CONSTRAINT users_pkey;
       public            postgres    false    215            {           2606    16706    users users_pkey1 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey1 PRIMARY KEY (email);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey1;
       public            postgres    false    216            �           2606    16734    job job_recruiter_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_recruiter_id_fkey FOREIGN KEY (recruiter_id) REFERENCES public.recruiter(rid);
 C   ALTER TABLE ONLY public.job DROP CONSTRAINT job_recruiter_id_fkey;
       public          postgres    false    220    3193    215               �  x��SMS�0<˿�� �ih�Ѥd8��p��b?�jdɣ���Jvd!b'ʾ�����$�qkvo]N�Bj7��/��ʿ���0�і� ��f����[�^�ӹ��L&��=ݱ���_�V5��?�ai]�g�S;6K�l�ڔ(�z�A�]7��t�%Z��CJ�v.{�K58���9�?ʜ��u���UW�pI�-[��r�0���#i���㶌մJ�`yɘ&�6�[�֨�Y��(�#j��D�W��P�@9�Ʌ��r��Б�;OΏ��`�'J�&.9CE��5'�r�R�Q��~�;ېP�/N{6T���}��^Tȥ���S,aű���~�$�l�7T����tH�����Wu<`	�����ի���'K̸����9��O[(^�~�ƨ��ǌ=8�<��2�Y�t|:�Q�1q���(jM�tC/���h1�,SN���F�� {C���o1ϒ�I�$�/Q�Y         V   x�35�t�I�Pp�HL��H��--J�t(-N�KM)�Զ0467�4665�t���IMOU�OSp�K��KM-��K�,��M�/�=... &��            x������ � �            x������ � �     