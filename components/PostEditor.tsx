import React from 'react';
import { useForm } from 'react-hook-form';
import { PostInput } from '../constants/Types';
import FormPage from './layout/FormPage';
import Input from './form/Input';
import Textarea from './form/Textarea';

export default function PostEditor({
    title,
    post,
    onSave,
    isLoading,
    errorMessage,
}: {
    title: string;
    post?: Partial<PostInput> | null;
    onSave: (post: PostInput) => void;
    isLoading: boolean;
    errorMessage?: string;
}) {
    const { register, handleSubmit } = useForm<PostInput>();

    return (
        <FormPage
            {...{
                title,
                isLoading,
                onSubmit: handleSubmit((post) => onSave(post)),
                button: !errorMessage ? 'Save' : <></>,
            }}
        >
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <>
                    <Input
                        {...register('title')}
                        defaultValue={post?.title ?? ''}
                        placeholder="Title"
                        type="text"
                    />
                    <Textarea
                        {...register('body')}
                        defaultValue={post?.body ?? ''}
                        placeholder="Body"
                        rows={10}
                    />
                </>
            )}
        </FormPage>
    );
}
