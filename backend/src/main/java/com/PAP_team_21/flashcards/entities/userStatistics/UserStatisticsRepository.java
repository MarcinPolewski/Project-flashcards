package com.PAP_team_21.flashcards.entities.userStatistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Integer> {

    @Procedure(procedureName = "get_github_style_chart_data")
    Object getGithubStyleChartData(@Param("customerId")Integer customerId);
}
