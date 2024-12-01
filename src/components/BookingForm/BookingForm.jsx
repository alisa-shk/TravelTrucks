import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./BookingForm.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enUS } from 'date-fns/locale';
import { useState } from "react";

const BookingForm = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [calendarDate, setCalendarDate] = useState(null);

    const toggleCalendar = () => {
        setIsCalendarOpen(prev => !prev);
    };

    const handleDateChange = (date, setFieldValue) => {
        const normalizedDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        if (normalizedDate < today) {
            toast.error('Please select a future date.');
        } else {
            setCalendarDate(normalizedDate);
            setFieldValue('bookingDate', normalizedDate.toISOString().split('T')[0]);
            setIsCalendarOpen(false);
        }
    };
    

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        bookingDate: Yup.date().required("Booking date is required"),
        comment: Yup.string(),
    });

    return (
        <div className={s.formWrapper}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    bookingDate: "",
                    comment: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    toast.success('Booking confirmed successfully!');
                    resetForm();
                    setCalendarDate(null);
                }}
            >
            {({ setFieldValue, values }) => (
                <Form className={s.form}>
                    <h3 className={s.formTitle}>Book your campervan now</h3>
                    <p className={s.formText}>Stay connected! We are always ready to help you.</p>
                    <div className={s.formField}>
                    <Field
                        type="text"
                        name="name"
                        placeholder="Name*"
                        className={s.input}
                    />
                    <ErrorMessage
                        name="name"
                        component="div"
                        className={s.errorMessage}
                    />
                    </div>
        
                    <div className={s.formField}>
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email*"
                        className={s.input}
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className={s.errorMessage}
                    />
                    </div>
        
                    <div className={s.formFieldDate}>
                        <Field
                            type="text"
                            name="bookingDate"
                            placeholder="Booking date"
                            value={values.bookingDate}
                            readOnly
                            onClick={toggleCalendar}
                            className={`${s.input} ${s.datePicker}`}
                        />
                        <ErrorMessage
                            name="bookingDate"
                            component="div"
                            className={s.errorMessage}
                        />
                        {isCalendarOpen && (
                            <div className={s.calendarWrapper}>
                            <Calendar
                                next2Label={null}
                                prev2Label={null}
                                onChange={date => handleDateChange(date, setFieldValue)}
                                value={calendarDate}
                                className={s.calendar}
                                locale={enUS}
                            />
                            </div>
                        )}
                    </div>
        
                    <div className={s.formField}>
                    <Field
                        as="textarea"
                        name="comment"
                        placeholder="Comment"
                        className={s.textarea}
                    />
                    <ErrorMessage
                        name="comment"
                        component="div"
                        className={s.errorMessage}
                    />
                    </div>
        
                    <button
                    type="submit"
                    className={s.submitButton}
                    >
                    Send
                    </button>
                </Form>
                )}
            </Formik>
            <ToastContainer position="top-center" />
            </div>
        );
}

export default BookingForm;