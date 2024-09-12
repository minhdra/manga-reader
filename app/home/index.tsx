import { ImageAutoHeight } from "@/components/image/ImageAutoHeight";
import { PAGE_WIDTH } from "@/constants";
import { useEffect, useState, useCallback } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View } from "tamagui";

export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);
  const [path, setPath] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://sv1.otruyencdn.com/v1/api/chapter/658daeb6e120ddf219911d06",
      );
      const res = await response.json();
      const data = res.data;
      const path = `${data.domain_cdn}/${data.item.chapter_path}`;
      setPath(path);
      setData(data?.item?.chapter_image || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ImageAutoHeight
        width={PAGE_WIDTH}
        key={item.image_page}
        uri={`${path}/${item.image_file}`}
        objectFit="contain"
        enableZoom={true}
      />
    ),
    [path],
  );

  if (loading) {
    return (
      <View flex={1}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View flex={1}>
      <GestureHandlerRootView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.image_page}
          initialNumToRender={5}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // Implement pagination or load more logic here if needed
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
}
