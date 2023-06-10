import { Card, CardContent, CardHeader } from "@mui/material";

export default function StatisticsCard(props) {
  return (
    <Card
      elevation={0}
      sx={
        props.colorMode.mode === "dark"
          ? styles.cardContainerDark
          : styles.cardContainer
      }
      width={props?.fullWidth ? "33.33%" : "100%"}
    >
      <CardHeader title={props.title} />
      <CardContent sx={styles.content}>{props?.children}</CardContent>
    </Card>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
    margin: "2% 0% 0% 2%",
  },
  cardContainerDark: {
    borderRadius: "10px",
    margin: "2% 0% 0% 2%",
  },
  content: {
    margin: "1% 0",
  },
};
