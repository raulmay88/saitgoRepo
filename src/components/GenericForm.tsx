import { useForm, SubmitHandler, FieldValues, Path, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GenericFormProps } from '../types/FormTypes';

const GenericForm = <T extends FieldValues>({ fields, onSubmit, initialData }: GenericFormProps<T>) => {
  const fieldKeys = Object.keys(fields) as (keyof T)[];
  const schema = z.object(
    Object.fromEntries(
      fieldKeys.map((key) => [key, fields[key].validation])
    ) as any
  );

  const defaultValues: DefaultValues<T> = initialData as DefaultValues<T>;

  const { register, handleSubmit, formState: { errors } } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? defaultValues : undefined
  });

  const onSubmitHandler: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {fieldKeys.map((key) => (
        <div key={key as string}>
          <label htmlFor={key as string}>{fields[key].label}</label>
          <input
            id={key as string}
            type={fields[key].type}
            {...register(key as Path<T>)}
            className='border rounded p-2'
          />
          {errors[key] && <p className='text-red-500'>{(errors[key] as any).message}</p>}
        </div>
      ))}
      <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Submit</button>
    </form>
  );
};

export default GenericForm;
