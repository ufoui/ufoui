// import * as yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import T from '../components/t';
//
// export const ReactHookFormYupPage = () => {
//     const schema = yup.object({
//         // firstName: yup.string(),
//         // age: yup.number().min(18).max(120),
//         // email: yup.string().email(),
//         // website: yup.string().url(),
//         // date: yup.date(),
//         // phone: yup.string(),
//         // startDate: yup.date(),
//         // endTime: yup.date(),
//         // title: yup.string().min(8).max(32),
//         agree: yup.string(),
//         // agree2: yup.boolean(),
//     });
//
//     type FormData = yup.InferType<typeof schema>;
//
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<FormData>({
//         mode: 'onBlur',
//         resolver: yupResolver(schema),
//         defaultValues: { agree: 'cat' },
//     });
//     const onSubmit = (data: FormData) => {
//         console.error('dat', data);
//     };
//     return (
//         <div className="container mx-auto">
//             <h1 className="my-4">
//                 <T id="home.hello" />
//             </h1>
//             <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//                 <Button color="success" elevated filled label="Wyślij" type="submit" />
//                 {/* <TextInput */}
//                 {/*    error={errors.firstName?.message} */}
//                 {/*    placeholder="Enter Your First name" */}
//                 {/*    title="First name" */}
//                 {/*    {...register('firstName')} */}
//                 {/* /> */}
//                 {/* <NumberInput */}
//                 {/*    error={errors.age?.message} */}
//                 {/*    placeholder="Enter your age" */}
//                 {/*    title="Age" */}
//                 {/*    {...register('age', { required: true, maxLength: 100 })} */}
//                 {/* /> */}
//                 {/* <EmailInput */}
//                 {/*    error={errors.email?.message} */}
//                 {/*    placeholder="Enter your email" */}
//                 {/*    title="Email" */}
//                 {/*    {...register('email')} */}
//                 {/* /> */}
//                 {/* <UrlInput */}
//                 {/*    error={errors.website?.message} */}
//                 {/*    placeholder="Enter your website address" */}
//                 {/*    title="Website" */}
//                 {/*    {...register('website', { required: true, maxLength: 100 })} */}
//                 {/* /> */}
//                 {/* <DateInput */}
//                 {/*    error={errors.date?.message} */}
//                 {/*    placeholder="Enter your date of birth" */}
//                 {/*    title="Date of Birth" */}
//                 {/*    {...register('date', { required: true, maxLength: 100 })} */}
//                 {/* /> */}
//                 {/* <TelInput */}
//                 {/*    error={errors.phone?.message} */}
//                 {/*    placeholder="Enter phone number" */}
//                 {/*    title="Telephone" */}
//                 {/*    {...register('phone', { required: true, maxLength: 100 })} */}
//                 {/* /> */}
//                 {/* <DateTimeInput */}
//                 {/*    error={errors.startDate?.message} */}
//                 {/*    placeholder="Enter start date" */}
//                 {/*    title="Start Date" */}
//                 {/*    {...register('startDate', { required: true, maxLength: 100 })} */}
//                 {/* /> */}
//                 {/* <TimeInput */}
//                 {/*    error={errors.endTime?.message} */}
//                 {/*    placeholder="Enter end time" */}
//                 {/*    title="End Time" */}
//                 {/*    {...register('endTime', { required: true, maxLength: 100 })} */}
//                 {/* /> */}
//                 <Checkbox title="Yes, I agree!" value="cat" {...register('agree', { required: true })} />
//                 {/* <Switch label="Yes, I agree!" title="Switch" {...register('agree2', { required: true })} /> */}
//                 {/* <Select {...register('title', { required: true })}> */}
//                 {/*    <option value="Mr">Mr</option> */}
//                 {/*    <option value="Mrs">Mrs</option> */}
//                 {/*    <option value="Miss">Miss</option> */}
//                 {/*    <option value="Dr">Dr</option> */}
//                 {/* </Select> */}
//             </form>
//         </div>
//     );
// };

export default () => null;
