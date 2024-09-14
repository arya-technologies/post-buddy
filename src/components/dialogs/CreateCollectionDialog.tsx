import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { List } from "react-native-paper";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

interface AboutAppDialogProos {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: ({ name }: { name: string }) => void;
}
const [name, setname] = useState<string>();

export default function AboutAppDialog({
  visible,
  onDismiss,
  onSubmit,
}: AboutAppDialogProos) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Create Collection</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Name" value={name} onChangeText={setname} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={() => name && onSubmit({ name })}>Create</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
