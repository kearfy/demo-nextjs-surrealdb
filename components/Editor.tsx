import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { PostInput } from "../constants/Types";

export default function PostEditor({
    post,
    onSave
}: {
    post?: Partial<PostInput>;
    onSave: (post: PostInput) => void;
}) {
    const { register, handleSubmit } = useForm<PostInput>();

    return (
        <form onSubmit={handleSubmit((post) => onSave(post))}>
            <input {...register('title')} placeholder="title" defaultValue={post?.title ?? ""} required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 w-96 max-w-full" />
            <textarea {...register('body')} placeholder="body" defaultValue={post?.body ?? ""} required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 w-96 max-w-full" rows={10} />
            <Button className=" mt-4">
                save
            </Button>
        </form>
    )
}