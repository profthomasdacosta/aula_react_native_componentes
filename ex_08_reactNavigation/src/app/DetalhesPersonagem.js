import React from "react";
import { Button, Image, Linking, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Estilos from "../estilos/Estilos";

const App = ({ route, navigation }) => {
  const { item } = route.params;

  const ListUrls = ({ item }) => {
    return (
      <View>
        <Text style={Estilos.detalhePersonagem}>Links</Text>
        {
          item.urls.map((e, index) => {
              let tipo = e.type;
              if (tipo === "detail")
                tipo = "Detalhe";
              else if (tipo === "wiki")
                tipo = "Wiki"
              else if (tipo === "comiclink")
                tipo = "HQ´s Site"

              return (
                <View>
                  <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>{tipo}</Text>
                  <Pressable onPress={() => Linking.openURL(e.url)}>
                    <Text style={Estilos.linkPersonagem}>{e.url}</Text>
                  </Pressable>
                </View>
              );
            }
          )
        }
        <View>
          <Text></Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={Estilos.safeAreaView}>
      <ScrollView>
        <View style={Estilos.alignVertical}>
          <View style={{ flex: 0.1 }} />
          <Text style={Estilos.detalhePersonagem}>{item.name}</Text>
        </View>
        <Image
          style={Estilos.imagemPersonagem}
          source={{
            uri: item.thumbnail.path + "/portrait_uncanny.jpg",
          }}
        />
        <View><Text></Text></View>
        <View style={Estilos.alignVertical}>
          <Button style={Estilos.button} title="HQ´s" onPress={() => {
            if (item.comics.items.length <= 0) {
              alert("Personagem não possui nenhuma HQ.");
              return;
            }
            navigation.navigate("HQ", {
              item: item,
            });
          }} />
          <View style={{ flex: 0.1 }} />
          <Button style={Estilos.button} title="Series" onPress={() => {
            navigation.navigate("Series", {
              item: item,
            });
          }} />
          <View style={{ flex: 0.1 }} />
          <Button style={Estilos.button} title="História" onPress={() => {
            navigation.navigate("Historia", {
              item: item,
            });
          }} />
          <View style={{ flex: 0.1 }} />
          <Button style={Estilos.button} title="Eventos" onPress={() => {
            navigation.navigate("Eventos", {
              item: item,
            });
          }} />
        </View>

        <Text
          style={Estilos.detalheDescricaoPersonagemAmarelo}>Descrição: </Text>
        <Text
          style={Estilos.detalheDescricaoPersonagem}>{item?.description === "" ? "Personagem sem descrição" : item?.description}</Text>
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>Data de Modificação:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.modified + "\r\n"}</Text>
        <View style={{ flex: 0.1 }} />
        <ListUrls item={item} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;