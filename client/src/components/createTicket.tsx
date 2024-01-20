import { Link } from "react-router-dom";
import Card from "./common/Card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketInterface } from "../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTicketService } from "../services/ticket.service";
import { TICKET_FORM_FIELDS } from "../constants";
import InputField from "./common/InputField";

function CreateTicket() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketInterface>();

  /* The `createTicketMutation` is used to handle the logic for creating a ticket. */
  const createTicketMutation = useMutation({
    mutationFn: createTicketService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["createTicket"] });
      toast.success(data.data.message);
      reset({ topic: "", description: "", severity: "", status: "", type: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /**
   * The function `onHandleCreateTicket` is a submit handler that calls the `createTicketMutation` if
   * `data` is present.
   */
  const onHandleCreateTicket: SubmitHandler<TicketInterface> = (data) => {
    if (data) {
      createTicketMutation.mutate(data);
    }
  };

  return (
    <div className="flex h-[92vh] w-screen">
      <div className="w-[100vw] flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <Link
          to={"/ticket"}
          className="my-5 w-auto bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
        >
          See All Tickets
        </Link>
        <Card>
          <div className="mb-5 float-left text-left">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Create Ticket</h2>
              <span className="text-white pr-2">Do not have an agent?</span>
              <Link
                to={"/agent"}
                className="text-blue-600 hover:text-blue-500 hover:cursor-pointer"
              >
                Create agent
              </Link>
            </div>

            {/* Form Fields */}
            {TICKET_FORM_FIELDS.map((item) => (
              <InputField
                key={item.id}
                label={item.label}
                name={item.name as "topic" | "description" | "type" | "severity" | "status"}
                register={register}
                registerOptions={item.registerOptions}
                errors={errors}
              />
            ))}

            <button
              onClick={handleSubmit(onHandleCreateTicket)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Create Ticket
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateTicket;
