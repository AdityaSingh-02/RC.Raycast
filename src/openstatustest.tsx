import { ActionPanel, Form, Action, Detail, List, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { checkPrime } from "crypto";

export default function Command() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token.length > 19) {
      const options = { method: "GET", headers: { "x-openstatus-key": token } };
      fetch("https://api.openstatus.dev/v1/monitor/", options)
        .then((response) => response.json())
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <>
      {loading && (
        <Form
          actions={
            <ActionPanel>
              <Action.SubmitForm
                title="Next"
                onSubmit={(values) => {
                  if (values.Token.length > 19) {
                    console.log(values);
                    setToken(values.Token);
                  } else {
                    console.log("Invalid Token");
                  }
                }}
              />
            </ActionPanel>
          }
        >
          <Form.TextField id="Token" title="Enter API Token" />
        </Form>
      )}
      {!loading && (
        <List>
          {data.map(({ name, status }) => (
            <List.Item
              key={name}
              title={name}
              actions={
                <ActionPanel>
                  <Action title="Select" onAction={() => console.log(`${name} selected`)} />
                </ActionPanel>
              }
              // accessories={[{icon: Icon.CheckCircle}]}
              icon={{
                source: Icon.Circle,
                tintColor: {
                  light: "green",
                  dark: "green",
                  adjustContrast: true,
                },
              }}
            />
          ))}
        </List>
      )}
    </>
  );
}
