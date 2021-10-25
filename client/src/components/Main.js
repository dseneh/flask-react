import React, {lazy, Suspense} from 'react';
import {Loader} from "semantic-ui-react";
const Pages = lazy(() => import("./Pages"))

const Main = () => {
    return (
        <div className="App">
            <Suspense fallback={<Loader active size="massive" />}>
                <Pages />
            </Suspense>
        </div>
    );
};

export default Main;