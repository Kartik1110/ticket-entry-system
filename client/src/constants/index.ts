/* NAV_TABS is used to render tabs on the navbar */
export const NAV_TABS = [
  { id: 1, name: "Agent", path: "/agent" },
  { id: 2, name: "Ticket", path: "/ticket" },
];

/* AGENT_FORM_FIELDS is used to render form fields on the agent form */
export const AGENT_FORM_FIELDS = [
  {
    id: 1,
    label: "Name",
    name: "name",
    registerOptions: {
      required: `This field is required!`,
    },
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    registerOptions: {
      required: "This field is required !",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "The value should be an email !",
      },
    },
  },
  {
    id: 3,
    label: "Phone",
    name: "phone",
    registerOptions: {
      required: "This field is required !",
    },
  },
  {
    id: 4,
    label: "Description",
    name: "description",
    registerOptions: {
      required: "This field is required !",
    },
  },
];
