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
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  cardContainerDark: {
    borderRadius: "10px",
    margin: "2% 0% 0% 2%",
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    margin: "1% 0",
  },
};
