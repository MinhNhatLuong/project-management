import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd }) {
  const title = useRef();
  const desciption = useRef();
  const dueDate = useRef();
  const modal = useRef();

  function handleSaveProject(title, desciption, dueDate) {
    //wil have validation

    if (
      title.trim() === "" ||
      desciption.trim() === "" ||
      dueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({ title, desciption, dueDate });
  }

  return (
    <>
      <Modal ref={modal} buttonLabel="Close">
        <h2>Invalid Input</h2>
        <p>Oops ... looks like you forgot to enter a value</p>
        <p>Please make sure you provide a valud value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-500 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleSaveProject(
                  title.current.value,
                  desciption.current.value,
                  dueDate.current.value
                );
              }}
              className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" label="Title" ref={title} />
          <Input label="Desciption" isTextArea ref={desciption} />
          <Input type="date" label="Due Date" ref={dueDate} />
        </div>
      </div>
    </>
  );
}
