package com.PAP_team_21.flashcards.authority;

import java.util.List;

public interface AuthorityDao {

    void save(Authority authority);

    Authority findAuthorityById(int id);

    List<Authority> findAllAuthorities();

    void update(Authority authority);

    void deleteAuthorityById(int id);
}
