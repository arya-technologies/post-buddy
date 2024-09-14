import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { pick, types } from "react-native-document-picker";
import rnfs from "react-native-fs";
import { Link, router } from "expo-router";
import CreateCollectionDialog from "@/components/dialogs/CreateCollectionDialog";

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
  const [collections, setcollections] = useState<Collections>();
  const [importedFile, setimportedFile] = useState<Collections>();

  const [createCollectionDialogVisible, setcreateCollectionDialogVisible] =
    useState<boolean>(false);
  const showCreateCollectionDialog = () =>
    setcreateCollectionDialogVisible(true);
  const hideCreateCollectionDialog = () =>
    setcreateCollectionDialogVisible(false);

  const importCollection = async () => {
    try {
      const [file] = await pick({ type: types.json });
      rnfs
        .readDir(rnfs.DocumentDirectoryPath + "collections")
        .catch(() => {
          rnfs.mkdir("collections");
        })
        .finally(() => {
          rnfs.copyFile(
            file.uri,
            rnfs.DocumentDirectoryPath + "collections" + file.name + ".json",
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  const createCollection = async ({ name }: { name: string }) => {
    try {
      const [file] = await pick({ type: types.json });
      rnfs
        .readDir(rnfs.DocumentDirectoryPath + "collections")
        .catch(() => {
          rnfs.mkdir("collections");
        })
        .finally(() => {
          rnfs.copyFile(
            file.uri,
            rnfs.DocumentDirectoryPath + "collections" + file.name + ".json",
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rnfs
      .readDir(rnfs.DocumentDirectoryPath + "collections")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <View>
        <Button onPress={importCollection}>Import</Button>
        <Button onPress={showCreateCollectionDialog}>Create</Button>
        <View>
          {importedFile?.item.map((collection) => (
            <Link
              href={{
                pathname: `collections/${collection.name}`,
                params: { name: collection.name },
              }}
              asChild
            >
              <TouchableOpacity
                key={collection.name}
                onPress={() =>
                  router.navigate(`collections/${collection.name}`)
                }
              >
                {collection.name}
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
      <CreateCollectionDialog
        visible={createCollectionDialogVisible}
        onDismiss={hideCreateCollectionDialog}
        onSubmit={createCollection}
      />
    </>
  );
}
