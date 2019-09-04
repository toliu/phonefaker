import * as React from "react";
import {InputPanel} from "./bottom-panel";

interface AdditionInputProps {
    onBack: () => void;
}

export class AdditionInput extends React.Component<AdditionInputProps, {}> {
    public render(): React.ReactElement {
        return (
            <InputPanel onBack={this.props.onBack}>
                addition
            </InputPanel>
        );
    }

}
