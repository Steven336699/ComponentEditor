import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { coderSchema, coderuiSchema } from "../schema/coderSchema.js";
import { read_a_coder, update_a_coder } from "../controller.js";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/monokai";

export class CoderField extends InputGroupModalField {
  showModal() {
    read_a_coder(this.state.objName).then(newPartData =>
      this.setState({ objData: newPartData, showModal: true })
    );
  }

  save() {
    update_a_coder(this.state.objName, this.currentData).then(res => {
      if (!res.ok) toast.error("Update coder failed " + res.statusText);
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
      console.log("Update response:", res);
    });
  }

  renderModalTitle() {
    return "Coder " + this.state.objName
  }

  renderInputGroup() {
    return (<Typeahead
      options={["a", "b", "c"]}
      placeholder="Select a coder..."
      defaultSelected={this.state.objName && [this.state.objName]}
      onInputChange={input => {
        this.setState({ objName: input });
        this.props.onChange(input);
      }}
    />);
  }

  renderModalBody() {
    return (
    <React.Fragment>
    <EditorForm
              schema={coderSchema}
              uiSchema={coderuiSchema}
              formData={this.state.objData}
              onChange={form => (this.currentData = form.formData)}
            >
              <Button type="submit" style={{ display: "none" }}>
                Submit
              </Button>
            </EditorForm>
            Preview
            <AceEditor
              mode="java"
              theme="monokai"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
            </React.Fragment>);
  }
}
