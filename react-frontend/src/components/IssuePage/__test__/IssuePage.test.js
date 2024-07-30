import React from "react";
import { render, screen } from "@testing-library/react";

import IssuePage from "../IssuePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders issue page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IssuePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("issue-datatable")).toBeInTheDocument();
    expect(screen.getByRole("issue-add-button")).toBeInTheDocument();
});
