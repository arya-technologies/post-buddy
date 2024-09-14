import { View } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { pick, types } from "react-native-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Collection {
  name: "accept-messages";
  request: {
    method: "POST";
    header: [];
    url: {
      raw: "{{localApi}}/users/accept-messages";
      host: ["{{localApi}}"];
      path: ["users", "accept-messages"];
    };
  };
  response: [];
}
interface Collections {
  info: object;
  item: Collection[];
}

export default function index() {
  const [importedFile, setimportedFile] = useState<Collections>();

  const importFile = async () => {
    try {
      const [file] = await pick({ type: types.json });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button onPress={importFile}>Import</Button>
      <View>
        {importedFile?.item.map((collection) => (
          <Text key={collection.name}>{collection.name}</Text>
        ))}
      </View>
    </View>
  );
}
