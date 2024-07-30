import React from "react";
import { render, screen } from "@testing-library/react";

import ContractorPage from "../ContractorPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders contractor page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ContractorPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("contractor-datatable")).toBeInTheDocument();
    expect(screen.getByRole("contractor-add-button")).toBeInTheDocument();
});
